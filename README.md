# 🌻 Aquabloom

Efficient water management is a critical factor in sustainable agriculture and horticulture. The AquaBloom system provides water requirement prediction using a decision tree algorithm to determine the precise amount of water required for plants based on their crop type, soil type, region, temperature, and the weather conditions of the plant's region. Based on various environmental factors, Aquabloom enhances irrigation strategies and optimizes plant health and resource efficiency.

This repository includes the code of *Aquabloom Web* for users to access the decision tree model prediction with a user-friendly interface. With this web, users can choose options of their crop type, soil type, region, temperature, and the weather conditions of the plant's region and get water requirement prediction based on those variables. The dataset used was from here: https://www.kaggle.com/datasets/prateekkkumar/crop-water-requirement


# 🤖 Technology Used

- This web uses React as a library for the front-end and Flask-Cors to ensure that communication between the back-end and the front-end domain is permissible.
- The model itself was made using the Decision Tree algorithm and was downloaded from Google Colab using the joblib library, then uploaded to the back-end folder under the name 'model.pkl'.

# 💼 Dependencies

In order to start, a few dependencies need to be installed in your environment. For the back-end, these are the dependencies needed:

- flask
- flask-cors
- joblib
- pandas
- scikit-learn (1.6.1 ver.)

For front-end, this web uses React as a library. So don't forget to install the React dependencies in the project folder using this line:

```
npm install
```

# 🧔 Credit
The decision tree model was made by @nicholastunru (https://github.com/nicholastunru)
