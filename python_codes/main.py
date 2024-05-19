from sklearn.ensemble import RandomForestClassifier
import csv

# Load csv file: map_id,grey_arr,boss_loc,uploader
with open('boss-data/boss-data-3.csv', 'r') as file:
    reader = csv.reader(file)
    rows = []
    for row in reader:
        rows.append(row)

rows = rows[1:] # Remove header


rows = [row[1:3] for row in rows] # Remove map_id and uploader
split_index = int(len(rows) * 0.8)
rows_train = rows[:split_index]
rows_test = rows[split_index:]

X_train = [row[0].split('_') for row in rows_train]
y_train = [row[1] for row in rows_train]
X_test = [row[0].split('_') for row in rows_test]
y_test = [row[1] for row in rows_test]


clf = RandomForestClassifier(verbose=1, n_jobs=-1, n_estimators=50, random_state=410)
clf.fit(X_train, y_train)
y_pred = clf.predict_proba(X_test)

for i in range(len(y_pred)):
    # Print probability in 4x4 grid, round to 2 decimal places
    for j in range(4):
        print_lst = y_pred[i][4*j:4*(j+1)]
        print_lst = [round(x, 2) for x in print_lst]
        print(print_lst)
    print("Actual:", y_test[i])

y_train_uniques = list(set(y_train))
y_train_uniques.sort()
print("Unique classes in y_train:", y_train_uniques)

