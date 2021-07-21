# resource "null_resource" "deploy" {
#   provisioner "local-exec" {
#     command = "cd aws s3 sync build/* s3://${var.bucket_name}"
#   }
#   depends_on = [aws_s3_bucket.react_bucket]
# }