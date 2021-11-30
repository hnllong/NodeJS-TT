up-dev:        
        docker-compose up -d --build

down: 
        docker-compose down

up-stag:
        docker-compose -f docker-compose.stag.yml up -d

up-prod:
        docker-compose -f docker-compose.prod.yml up -d
