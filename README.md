Name project: training-server
Author: hieulv

# up-dev
    - docker-compose up -d --build
# down
    - docker-compose down
# up-stag
    - docker-compose -f docker-compose.stag.yml up -d
# up-prod
    - docker-compose -f docker-compose.prod.yml up -d

# note localstack-s3
    - create bucket: images
    - aws --endpoint-url=http://localhost:4566 s3 mb s3://images

# user
    - thay đổi quyền của api user/create tạo ra 1 tài khoản admin, set active: 2, role: 0
    - sau đó reset lại api lại như ban đầu và thực hiện các chức năng khác
