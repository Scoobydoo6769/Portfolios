import pandas as pd

df = pd.read_csv("data.csv", index_col="Name")

pokemon = input("Enter your pokemon: ")

try:
    print(df.loc[pokemon])
except KeyError:
    print(f"{pokemon} not found")