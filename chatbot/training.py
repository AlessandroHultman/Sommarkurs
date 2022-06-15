import random
from keras.optimizers import SGD  # type: ignore
from keras.layers import Dense, Activation, Dropout  # type: ignore
from keras.models import Sequential  # type: ignore
import numpy as np  # type: ignore
import pickle
import json
from nltk.stem import WordNetLemmatizer  # type: ignore
import nltk  # type: ignore

nltk.download('punkt')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()

words = []
classes = []
documents = []
ignore_words = ['?', '!']
data = open('intents.json').read()
intents = json.loads(data)

for intent in intents['intents']:
    for pattern in intent['patterns']:
        # take each word and tokenize it
        w = nltk.word_tokenize(pattern)
        words.extend(w)
        documents.append((w, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

words = [lemmatizer.lemmatize(word)
         for word in words if word not in ignore_words]

# sort and remove any duplicates with set
words = sorted(set(words))
classes = sorted(set(classes))

# serialize words and classes for later reading
pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))

# initialize training data
training = []
output_empty = [0] * len(classes)
for doc in documents:
    bag = []
    # list of tokenized words for the pattern
    pattern_words = doc[0]
    # lemmatize each word
    pattern_words = [lemmatizer.lemmatize(
        word.lower()) for word in pattern_words]
    for w in words:
        bag.append(1) if w in pattern_words else bag.append(0)

    # output is a '0' for each tag and '1' for current tag
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1

    training.append([bag, output_row])

# shuffle features and turn into numpy array
random.shuffle(training)
training = np.array(training)
# create train and test lists. X_patterns, Y_intents
train_x = list(training[:, 0])
train_y = list(training[:, 1])

# Creating model of 3 layers. First layer contains 128 neurons, second layer contains 64 neurons and 3rd output layer contains number of neurons
# equal to number of intents to predict output intent with softmax function
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))

# Compile model. And Stochastic gradient descent with Nesterov accelerated gradient gives good results for this model
sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy',
              optimizer=sgd, metrics=['accuracy'])

# fitting and saving the model
hist = model.fit(np.array(train_x), np.array(train_y),
                 epochs=200, batch_size=5, verbose=1)
model.save('chatbot_model.h5', hist)
print("\nModel created.")
