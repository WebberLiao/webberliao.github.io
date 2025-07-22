# PIP
## Common
``` Shell
# Force to upgrade the pip from the specific Python version
python3 -m pip install --upgrade pip

# Install packages from the file
pip install -r requirement.txt

# Show the package information
pip show {Package_Name}



```
## Packages
``` Shell
axios               # HTTP request
beautifulsoup4      # beautifulsoup
pandas              # Pandas
yfinance            # Yahoo finance
Flask               # Flask
Flask-Cors          # Flask CORS
Flask-SQLAlchemy    # Flask SQL management
```

# Linked List
``` Python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data, position):
        new_node = Node(data)
        if position == 0:
            new_node.next = self.head
            self.head = new_node
            return
        current_node = self.head
        for _ in range(position - 1):
            if current_node is None:
                raise IndexError("Position out of bounds")
            current_node = current_node.next
        new_node.next = current_node.next
        current_node.next = new_node

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last_node = self.head
        while last_node.next:
            last_node = last_node.next
        last_node.next = new_node

    def display(self):
        current_node = self.head
        while current_node:
            print(current_node.data, end=" -> ")
            current_node = current_node.next
        print("None")

    def delete(self, key):
        current_node = self.head
        if current_node and current_node.data == key:
            self.head = current_node.next
            current_node = None
            return
        prev_node = None
        while current_node and current_node.data != key:
            prev_node = current_node
            current_node = current_node.next
        if current_node is None:
            return
        prev_node.next = current_node.next
        current_node = None

# Example usage
linked_list = LinkedList()
linked_list.append(1)
linked_list.append(2)
linked_list.append(3)
linked_list.display()  # Output: 1 -> 2 -> 3 -> None
linked_list.delete(2)
linked_list.insert(1.5, 1)
linked_list.display()  # Output: 1 -> 1.5 -> 3 -> None
```

# Crawler - yfinance
For Finance YAHOO

## Install
``` Shell
pip install requests beautifulsoup4 pandas yfinance axios
```

## Code

``` Python
import datetime as dt
import yfinance as yf
import matplotlib.pyplot as plt

now = dt.datetime.now()
today = now.strftime("%Y-%m-%d")
months_ago = (now - dt.timedelta(days=90)).strftime("%Y-%m-%d") # 3 months

stock_symbols = ['AAPL', 'TSLA', '2330.TW']  # Apple, Tesla, TSMC

def get_history(symbol):
    stock = yf.Ticker(symbol)
    # history only can get one ticker information 
    historical_data = stock.history(period="1mo", interval="1d", start=months_ago, end=today)

def get_weekly_close_prices(symbol):
    # Get historical data for the last 3 months
    # download can get multiple tickers information
    stock_data = yf.download(symbol, period='3mo', interval='1d')
    print(f'{stock_data}')
    # Resample the data to weekly frequency and get the last closing price of each week
    weekly_close = stock_data['Close'].resample('W').last()  # Get the last closing price of each week
    return weekly_close

for symbol in stock_symbols:
    datas = get_weekly_close_prices(symbol)
    get_history(symbol)
    print(f'{datas}')
```

## Reference

[Link]("https://ranaroussi.github.io/yfinance/reference/api/yfinance.download.html#yfinance.download")




# End of the file