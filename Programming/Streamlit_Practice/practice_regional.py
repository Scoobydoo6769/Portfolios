import streamlit as st
import pandas as pd
import numpy as np

st.title("Dashboard Practice")

with st.sidebar:
    st.header("Sidebar")
    st.write("This is a side bar!")

st.header("This is a header with a :rainbow[divider]", divider="rainbow")

st.subheader("Column")
st.markdown("This is created with st.markdown.")

col1, col2 = st.columns(2)

with col1:
    x = st.slider("Choose an x value", 1, 10)
with col2:
    st.write("The value of :blue[***x***] is", x)


st.subheader("Area Chart")
chart_data = pd.DataFrame(np.random.randn(20, 3), columns=["a","b","c"])
st.area_chart(chart_data)