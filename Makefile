build:
	docker build -t internship-back:v0.01 .
run:
	docker run -p 3001:3001 -d --rm --name internship-back-cont --env-file ./.env -v logs:/app/data internship-back:v0.01
stop:
	docker stop internship-back-cont
