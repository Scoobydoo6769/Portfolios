import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt

# ตั้งค่าหน้าเว็บให้เป็นแบบกว้าง
st.set_page_config(page_title="Population Dashboard", layout="wide")

st.title("📊 แดชบอร์ดวิเคราะห์ข้อมูลประชากร")
st.markdown("เครื่องมือวิเคราะห์และแสดงผลข้อมูลประชากรแบบโต้ตอบ (แผนภูมิแท่ง)")

# โหลดข้อมูลจากไฟล์ Excel ที่คลีนแล้ว
@st.cache_data
def load_data():
    file_path = "ข้อมูลประชาทั้ง10ปี clean.xlsx"
    df = pd.read_excel(file_path)
    return df

try:
    df = load_data()
except Exception as e:
    st.error(f"ไม่สามารถโหลดไฟล์ข้อมูลได้: {e}")
    st.stop()

# --- แถบตัวกรอง (Sidebar Filters) ---
st.sidebar.header("🎛️ ตัวกรองข้อมูล (Filters)")

filtered_df = df.copy()

# 1. เงื่อนไขการกรองตามจังหวัด
if 'จังหวัด' in df.columns:
    provinces = sorted(df['จังหวัด'].unique())
    selected_province = st.sidebar.selectbox("เลือกจังหวัด:", provinces)
    filtered_df = filtered_df[filtered_df['จังหวัด'] == selected_province]

# 2. เงื่อนไขการกรองตาม "เดือนข้อมูล"
if 'เดือนข้อมูล' in df.columns:
    months = df['เดือนข้อมูล'].unique()
    selected_month = st.sidebar.selectbox("เลือกปี:", months)
    filtered_df = filtered_df[filtered_df['เดือนข้อมูล'] == selected_month]

# --- แสดงผลลัพธ์หลักบนหน้าเว็บ ---
col1, col2 = st.columns(2)

with col1:
    st.subheader(f"📋 ข้อมูล (จังหวัด: {selected_province} | ช่วงเวลา: {selected_month})")
    st.dataframe(filtered_df, use_container_width=True)

with col2:
    st.subheader("📊 แผนภูมิแท่งแสดงผลเปรียบเทียบ")
    
    if 'จังหวัด' in df.columns and 'เดือนข้อมูล' in df.columns and 'ประชากร_รวม' in df.columns:
        # ดึงข้อมูลเฉพาะจังหวัดที่เลือก
        trend_df = df[df['จังหวัด'] == selected_province].copy()
        
        fig, ax = plt.subplots(figsize=(8, 5))
        
        # ดึงเฉพาะตัวเลขปีออกมาแสดงผล (ตัดคำว่าเดือนภาษาไทยออกเพื่อป้องกันฟอนต์สี่เหลี่ยม)
        trend_df['Short_Year'] = trend_df['เดือนข้อมูล'].astype(str).str.extract(r'(\d+)')[0]
        
        # กำหนดสีแท่ง
        colors = ['#1f77b4' if m != selected_month else '#ff7f0e' for m in trend_df['เดือนข้อมูล']]
        
        # ใช้ Short_Year สำหรับแกน X
        bars = ax.bar(trend_df['Short_Year'], trend_df['ประชากร_รวม'], color=colors, width=0.6)
        
        ax.set_title(f"Comparing Population of each years in Surat Thani")
        ax.set_xlabel("Years")
        ax.set_ylabel("Population")
        ax.grid(axis='y', linestyle='--', alpha=0.6)
        
        # ป้ายกำกับ Legend
        from matplotlib.patches import Patch
        legend_elements = [
            Patch(facecolor='#1f77b4', label='Overall Data'),
            Patch(facecolor='#ff7f0e', label=f'Selected Month')
        ]
        ax.legend(handles=legend_elements, loc='upper right')
        
        plt.tight_layout()
        st.pyplot(fig)
    else:
        st.info("ไม่พบคอลัมน์ที่จำเป็นสำหรับวาดแผนภูมิแท่ง")