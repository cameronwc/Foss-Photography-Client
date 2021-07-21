resource "aws_acm_certificate" "cert" {
  domain_name               = "${aws_route53_zone.main.name}"
  
  subject_alternative_names = [
    "www.${aws_route53_zone.main.name}",
  ]

  validation_method         = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.validation: record.fqdn]
  timeouts {
    create = "60m"
  }
}