Name project: training-server
Author: hieulv

# run

- clone code
- or cloned
- git checkout master && git fetch && git pull

- docker-compose up -d

- link docs: http://localhost:5000/api/docs/v1/
- link example api: http://localhost:5000/api/v1/user/login, ....

# detail

- user
- department
- request
- timesheet
- file

# note S3

- create new bucket
- images is require
- aws --endpoint-url=http://localhost:4566 s3 mb s3://images
- file, image, bucker save in localstack/recorded_api_calls.json
