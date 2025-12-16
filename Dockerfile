# usin alpine nginx
FROM nginx:alpine
# copy every thing from main root dir
COPY . /usr/share/nginx/html/
# using port 80
EXPOSE 80