
resource "aws_route53_record" "validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options: dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.main.zone_id
}

resource "aws_route53_zone" "main" {
  name = "${var.domain}"
}

resource "aws_route53_record" "root_domain" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "${var.domain}"
  type = "A"

  alias {
    name = replace(aws_cloudfront_distribution.cdn.domain_name, "/[.]$/", "")
    zone_id = "${aws_cloudfront_distribution.cdn.hosted_zone_id}"
    evaluate_target_health = false
  }

  depends_on = [aws_cloudfront_distribution.cdn]
}

resource "aws_route53_record" "www" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "www.${var.domain}"
  type = "A"

  alias {
    name = replace(aws_cloudfront_distribution.cdn.domain_name, "/[.]$/", "")
    zone_id = "${aws_cloudfront_distribution.cdn.hosted_zone_id}"
    evaluate_target_health = false
  }

  depends_on = [aws_cloudfront_distribution.cdn]
}

output "route53_domain" {
  value = "${aws_route53_record.root_domain.fqdn}"
}
