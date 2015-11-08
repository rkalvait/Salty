response = unirest.post("https://community-sentiment.p.mashape.com/text/",
      headers={
        "X-Mashape-Key": "QFheDA3xy4msh6RQ2M5aXPqrHJJOp1b483ojsnlQEjzksKtFYu",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      params={
        "txt": "It was fucking not not fantastic"
      }
    )
print response.body