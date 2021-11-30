up:        
        docker-compose up -d --build

down: 
        docker-compose down

up-prod:
        docker-compose -f docker-compose.prod.yml up -d
