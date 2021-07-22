.PHONY: build package deploy

build:
	docker build -t foss-photography-client:latest .
	docker run -it -p 3000:3000 foss-photography-client:latest

package:
	mkdir -p packages/foss-photography-client
	docker build -t foss-photography-client:package --target package .
	docker run -v `pwd`/packages:/tmp/packages foss-photography-client:package
	mkdir -p terraform/build/foss-photography-client
	cp -r packages/foss-photography-client/* terraform/build/foss-photography-client

deploy:
	make package
	cd terraform && terraform init && terraform validate -no-color && terraform apply -auto-approve
	cd terraform && aws s3 sync build/* s3://foss.photography
