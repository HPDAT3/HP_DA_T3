#%%

from matplotlib.font_manager import json_load
from pymongo import MongoClient
import pymongo
import json
import random
import math

f = open(r"company_list.json")
# f = open(r"./summary_upload/company_list.json")
data = json.load(f)
# print(data)
# exit()
data

#%%

PASS="mongodb+srv://Piyush:ginniferpep123@cluster0.ewfh1.mongodb.net/testDB"

def get_database():

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = PASS

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client["SaaS_Metrics"]
    
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":    
    
    # Get the database
    dbname = get_database()
    for company in data:
        collection_name = dbname["Company"]
        to_upload = {
            "_id" : company["cik"],
            "name" : company["Company"] 
        }
        collection_name.insert_one(to_upload)
        print("Added", company["Company"])

#%%

f = open(r"forms.json")
# f = open(r"./summary_upload/company_list.json")
data = json.load(f)
# print(data)
# exit()
data


def makeId():
    n1 = math.trunc((random.random())*100000000)
    n2 = math.trunc((random.random())*100000000)
    id = str(n1) + str(n2)
    print(id)
    return id
if __name__ == "__main__":    
    
    # Get the database
    dbname = get_database()
    for company in data:
        collection_Forms = dbname["Forms"]
        collection_Company = dbname["Company"]
        madeUpId = makeId()
        cik = company["cik"]
        to_upload = {
            "_id" : madeUpId,
            "name" : company["name"] ,
            "type" : company["type"],
            "paras" : company["paras"],
            "cik" : company["cik"],
        }
        # # coll.update({'ref': ref}, {'$push': {'tags': new_tag}})
        collection_Company.update_one({"_id" : cik}, {"$addToSet" : {"forms" : madeUpId}})
        collection_Company.update_one({"_id" : cik}, {"$addToSet" : {"formName" : company["name"]}})

        collection_Forms.insert_one(to_upload)
        print("Added", company["name"])

# %%
# Next work
