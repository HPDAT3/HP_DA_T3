# Digital Alpha's SEC Filing Analyzer for SaaS Companies

### Sections

1. [Data Processing / ML](https://github.com/HPDAT3/HP_DA_T3/master/README.md#data-processing--ml)
2. [API](https://github.com/HPDAT3/HP_DA_T3/master/README.md#api-documentation)
3. [Web App](https://github.com/HPDAT3/HP_DA_T3/master/README.md#web-app-documentation)


## Note

- The code was tested on an Ubuntu 20.04 LTS machine running Python 3.8.10.

---

# Data Processing / ML

---

# Setting Up the Python Env

- Install the requirements from `requirements.txt` using `pip3 install -r requirements.txt`. (Preferably in a virtual environment.)

# Downloading Data

- Run the `download_fillings.py` for dowloading the data.
- Download and run mongodb.
- Make sure its running at `127.0.0.1:27017`
- Then run the `populate_db.py` file to upload the cleaned data to the local mongodb service.

# Documentation for each file

- `download_filings.py` : This for the downloading the forms for companies given in the PS. It uses a csv file consisting of the CIK for these companies.
- `extract_cik.py` : This was used to find the CIK for all the companies given in PS. We found the list of the companies similiar to the given name, then used an string matching algorithm (from `difflib` module in python 3) to find the closest name and then took CIK of that name. Except 10-15 names all of the companies and the CIK were easily and accurately found. We added the remaining CIK manually in the sheet.
- `extract_ticker.py` : This was used for mapping the CIK to the tickers.
- `parse_10q.py`: This file consist of function for parsing the 10Q forms.
- `parse_form.py` : This file consist of function for parsing the 10K forms.
- `populate_db.py` : This will read the downloaded files and upload the cleaned dataset to mongodb.

- For parsing the forms, we have used regular expressions to extract each section's text in form of paragraphs and corresponding tables in that section. They are stored in a JSON format and accessed as such.

# ML

- All ML models were run using hugging face's pipeline.
- For sentinment analysis, we have used finbert, a pre trained model using BERT on finanical text.
- It gives softmax score of three outputs - positive, negative, nuetral.

# References

- https://github.com/jadchaar/sec-cik-mapper
- https://github.com/eabase/py-edgar
- https://github.com/jadchaar/sec-edgar-downloader
- https://airccj.org/CSCP/vol7/csit76615.pdf
- https://gitlab.com/juliensimon/huggingface-demos/-/blob/main/sec-filings/SEC_functions.ipynb
- https://huggingface.co/ProsusAI/finbert
- https://huggingface.co/facebook/bart-large-mnli

---

# API Documentation

---

- Link to the API : https://sec-dataset-downloader.herokuapp.com/create_dataset
- We were told to make an API to download dataset for any tickers for given forms and range of date.
- Parameters required for this API:

Example:

```json
{
   "tickers" : ["AAPL", "MSFT"],
   "start" : "2021-01-01",
   "end": "2022-01-01",
   "forms" : ["10-K", "10-Q"]
}
```

- Method used: **POST**
- To use the API, send these parameters only, there is also an optional paramter called `end` which defaults to January 1st of 2022.
- Dataset consisting of only the forms filed between these date are returned.
- The dataset is returned in form of csv file.
- CuRL command for the same:

```bash
curl --location --request POST 'https://sec-dataset-downloader.herokuapp.com/create_dataset' \
--header 'Content-Type: application/json' \
--data-raw '{
   "tickers" : ["AAPL", "MSFT"],
   "start" : "2021-01-01",
   "forms" : ["10-K", "10-Q"]
}'
```

- **NOTE** : Downloading the dataset takes lot of space in backend, which might be too big for heroku. Kindly run on local system as it might be downloading GBs of data for processing depending on the time range, no of companies and no of filings.

---

# Web App Documentation

--- 

1) In order to run this, within the root directory make sure to install dependencies by opening the terminal and typing the following

```bash
npm install
```

2) Next we need to install the dependencies within the `client` directory. You can do so by typing the following

```bash
cd client
npm install
```

3) Now all thats left to do is run the start script within the `root` directory and within the `client` directory. 
4) Use two terminals and type the following commands.

Terminal 1:

```bash
npm install
npm start
```

Terminal 2:

```bash
cd client/
npm install
npm start
```

5) Ports -

```
5000 -> Backend
3000 -> Frontend (client/)
```
