# news-app

## Run the app

#### Prerequisite: Docker

1. Clone the repository
2. `cd news-app`
3. Edit `docker-compose.yml` and replace to `<API_KEY>` to an active API key for https://newsapi.org/
4. Run `docker compose up`
5. Open browser at http://localhost:5006

The page displayed lists recent articles, which can be filtered by typing search text and selecting one category. Clicking on an item will open the article in full tab.
