# FOSS Photography Client

![build and test](https://github.com/cameronwc/Foss-Photography-Client/actions/workflows/main.yml/badge.svg)
![codeql](https://github.com/cameronwc/Foss-Photography-Client/actions/workflows/codeql.yml/badge.svg)
![deploy](https://github.com/cameronwc/Foss-Photography-Client/actions/workflows/deploy.yml/badge.svg)
[![Docker Hub](https://img.shields.io/docker/cloud/build/cameronwc/Foss-Photography-Client?label=Docker&style=flat)](https://hub.docker.com/r/cameronwc/Foss-Photography-Client/builds)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cameronwc_Foss-Photography-Client&metric=alert_status)](https://sonarcloud.io/dashboard?id=cameronwc_Foss-Photography-Client)

## Requirements
For this project Docker has to be installed

## Get Started
Clone the repo
```
git clone git@github.com:cameronwc/Foss-Photography-Client.git
```

Run Server
```
make build
```

## Make (docker)

```bash
make build
```

## Docker Compose

```bash
docker-compose build && docker-compose up
```

Browse to [localhost:3000](localhost:3000)

## Technologies

### Frontend
* React
* Tailwind CSS

### Cloud
* Terraform
* AWS (acm, cloudfront, route53, s3)

### Containerization
* Docker
* Docker Compose

### CI/CD
* Github Actions

### Security Scanning
* Sonarcloud
* Snyk
* CodeQL

## Author
Cameron Cooper
* [https://github.com/cameronwc](https://github.com/cameronwc)

## Licensing & Copyright

This software and all code is solely owned by Cameron Cooper and is provided without a license.

[No License](https://choosealicense.com/no-permission/)

Copyright © 2021, Cameron Cooper. Released without a license.