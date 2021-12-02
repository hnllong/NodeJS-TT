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

# user
    - nếu mới clone lại từ đầu chưa có data thì hãy làm theo các bưới dưới đây:
    - tất cả các tài khoản chỉ được tạo thông qua tài khoản admin vì thế phải tạo 1 tài khoản admin trước
    - thay đổi quyền của api user/create tạo ra 1 tài khoản admin, set active: 2, role: 0
    - sau đó reset lại api lại như ban đầu và thực hiện các chức năng khác
