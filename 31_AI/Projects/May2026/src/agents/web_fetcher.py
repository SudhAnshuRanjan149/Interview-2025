import requests
from bs4 import BeautifulSoup


def fetch_url_text(url: str, timeout: int = 10) -> str:
    resp = requests.get(url, timeout=timeout)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    # very simple extraction
    texts = [p.get_text(separator=" ") for p in soup.find_all("p")]
    return "\n\n".join(texts)


if __name__ == "__main__":
    print(fetch_url_text("https://example.com"))
