import json
import random
import json
import pickle
import numpy as np
import nltk                                           #type: ignore
import flask
import typing
from typing import Dict, List, Set, Tuple
from nltk.stem import WordNetLemmatizer               #type: ignore
from keras.models import Sequential                   #type: ignore
from keras.layers import Dense, Activation, Dropout   #type: ignore
from keras.optimizers import SGD                      #type: ignore

lemmatizer: WordNetLemmatizer = WordNetLemmatizer()

intents: Dict[str, List[Dict[str, str]]] = json.loads(open('intents.json').read())

words: List[str] = []
classes: List[str] = []
documents: List[Tuple[List[str], str]] = []
ignore_chars: List[str] = ['?', '!', '.', ',']

for intent in intents['intents']:
  for pattern in intent['patterns']:
    word_list: List[str] = nltk.word_tokenize(pattern)
    words.extend(word_list)
    documents.append((word_list, intent['tag']))
    if intent['tag'] not in classes:
      classes.append(intent['tag'])

words_lemmatized = [lemmatizer.lemmatize(word) for word in words if word not in ignore_chars]
words_sorted: Set[str] = sorted(set(words_lemmatized))
classes_sorted: Set[str] = sorted(set(words_lemmatized)) # todo: fix this shit

pickle.dump(words_sorted, open('words.pkl', 'wb'))
pickle.dump(words_sorted, open('classes.pkl', 'wb'))

training: List[int] = []
