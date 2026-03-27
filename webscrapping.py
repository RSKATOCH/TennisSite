import urllib3.request
from bs4 import BeautifulSoup
from datetime import datetime
import requests
import csv


n = 0
data = []
while n < 2000:
    page_url = "http://www.tennis.com/player/"+str(n)
    r = requests.get(page_url)
    if (r.status_code != requests.codes.ok):
        n = n+1
        continue
    page_url = r.url
    page_url = page_url + "stats"
    page = requests.get(page_url)

    soup = BeautifulSoup(page.text, 'html.parser')
    first_name = soup.find('span', class_ = 'first-name')
    if first_name is None:
        n = n + 1
        continue
    first_name = first_name.get_text()
    last_name = soup.find('span', class_ = 'last-name')
    if last_name is None:
        n = n + 1
        continue
    last_name = last_name.get_text()
    birthdate = soup.find('span', class_ = 'player-birthdate')
    if birthdate is None:
        n = n + 1
        continue
    birthdate = birthdate.get_text()
    ytp = soup.find_all('span', class_ = 'about-info')
    if ytp is None:
        n = n + 1
        continue

    if len(ytp) < 4:
        n = n + 1
        continue
    ytp = ytp[3].get_text()
    birthdate = datetime.strptime(birthdate, '%B %d, %Y').strftime('%Y%m%d')

    # print(first_name)
    # print(last_name)
    # print(birthdate)
    sub_data = {'first_name': first_name, 'last_name': last_name, 'birthdate':birthdate, 'ytp':ytp}
    data.append(sub_data)
    n += 1

with open('project_test2.csv', 'w') as new_csvfile:
    fieldnames = ["first_name", "last_name", "birthdate", "ytp"]
    writer = csv.DictWriter(new_csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)
