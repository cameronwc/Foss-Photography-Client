resource "aws_cloudfront_distribution" "cdn" {
  origin {
    origin_id   = "${var.domain}"
    domain_name = "${aws_s3_bucket.react_bucket.bucket_regional_domain_name}"
  }

  # If using route53 aliases for DNS we need to declare it here too, otherwise we'll get 403s.
  aliases = ["${var.domain}", "www.${var.domain}"]

  enabled             = true
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = "pixel-helper-logs.s3.amazonaws.com"
    prefix          = "cdn_logs"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.domain}"

    forwarded_values {
      query_string = true
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # The cheapest priceclass
  price_class = "PriceClass_100"

  # This is required to be specified even if it's not used.
  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US"]
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method = "sni-only"
  }

  tags = {
    Environment = "production"
  }
  
  depends_on = [aws_acm_certificate.cert]
}

output "cdn_domain" {
  value = "${aws_cloudfront_distribution.cdn.domain_name}"
}