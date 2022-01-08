data "aws_iam_policy_document" "canary-assume-role-policy" {
    statement {
        actions = ["sts:AssumeRole"]
        effect = "Allow"

        principals {
            identifiers = ["lambda.amazonaws.com"]
            type = "Service"
        }
    }
}

resource "aws_iam_role" "canary-role" {
    name = "canary-role"
    path = "/foss/"
    assume_role_policy = data.aws_iam_policy_document.canary-assume-role-policy.json
    description = "Canary role for synthetic"
}

data "aws_iam_policy_document" "canary-policy" {
    statement {
        sid = "CanaryGeneric"
        effect = "Allow"
        actions = [
            "s3:GetObject",
            "s3:PutObject",
            "s3:GetBucketLocation",
            "s3:ListAllMyBuckets",
            "cloudwatch:PutMetricData",
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
            "xray:PutTraceSegments",
            "xray:PutTelemetryRecords",
            "xray:GetSamplingRules",
            "xray:GetSamplingTargets",
            "xray:GetSamplingStatisticSummaries"
        ]
        
        resources = ["*"]
    }
}

resource "aws_iam_policy" "canary-policy" {
    name = "canary-policy"
    path = "/foss/"
    policy = data.aws_iam_policy_document.canary-policy.json
    description = "Iam policy for synthetic"
}

resource "aws_iam_role_policy_attachment" "canary-policy-attachment" {
    role = aws_iam_role.canary-role.name
    policy_arn = aws_iam_policy.canary-policy.arn
}
