resource "aws_synthetics_canary" "foss-canary" {
    name = "foss-canary"
    artifact_s3_location = "s3://${resource.aws_s3_bucket.foss-canary.id}/"
    execution_role_arn = resource.aws_iam_role.canary-role.arn
    handler = "canary.handler"
    zip_file = "${path.cwd}/build/canary.zip"
    runtime_version = "syn-nodejs-puppeteer-3.3"
    start_canary = true

    success_retention_period = 2
    failure_retention_period = 7

    schedule {
      expression = "cron(0 8 * * ? *)"
      duration_in_seconds = 0
    }

    run_config {
      timeout_in_seconds = 20
      memory_in_mb = 960
      active_tracing = true
    }
}
