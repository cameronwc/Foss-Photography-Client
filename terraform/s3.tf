resource "aws_s3_bucket" "react_bucket" {
  bucket = "${var.bucket_name}"
  acl    = "public-read"

  policy = <<EOF
{
  "Id": "bucket_policy_site",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "bucket_policy_site_main",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.bucket_name}/*",
      "Principal": "*"
    }
  ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket" "foss-canary" {
  bucket = "foss-canaries"
  acl = "private"
  versioning {
    enabled = false
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

resource "aws_s3_bucket_policy" "canary_bucket_policy" {
  bucket = aws_s3_bucket.foss-canary.id
  policy = jsonencode({
    Version = "2012-10-17"
    Id = "foss-canaries"
    Statement = [{
      Sid = "IPAllow"
      Effect = "Allow"
      Principal = "*"
      Action = "s3:GetObject"
      Resource = [
        aws_s3_bucket.foss-canary.arn,
        "${aws_s3_bucket.foss-canary.arn}/*"
      ]
      Condition = {
        IpAddress = {
          "aws:SourceIp" = ["67.174.177.98"]
        }
      }
    },
    {
      Sid = "AllowCanary"
      Effect = "Allow"
      Principal = "*"
      Action = "s3:*"
      Resource = [
        aws_s3_bucket.foss-canary.arn,
        "${aws_s3_bucket.foss-canary.arn}/*"
      ]
      Condition = {
        ArnEquals = {
          "aws:SourceArn": resource.aws_iam_role.canary-role.arn
        }
      }
    }]
  })
}

output "website_domain" {
  value = "${aws_s3_bucket.react_bucket.website_domain}"
}

output "website_endpoint" {
  value = "${aws_s3_bucket.react_bucket.website_endpoint}"
}
