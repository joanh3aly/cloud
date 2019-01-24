import matplotlib.pyplot as plt
import pandas as pd
import numpy as np


df = pd.read_csv('/Applications/MAMP/htdocs/cloud/maps/globe/worldcities-2.csv')


#print(df)


lat = df.iloc[:,2]
lng = df.iloc[:,3]
city = df["city"]

#df[["lat", "lng"]] = df[["lat", "lng"]].apply(pd.to_numeric)

df = pd.DataFrame({'city': city, 'lat': lat, 'lng': lng})
print(df.dtypes)
#print(df)

df.to_csv("cleanedCities-5.csv", sep=',', encoding='utf-8')