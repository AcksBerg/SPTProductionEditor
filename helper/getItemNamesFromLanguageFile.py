import json

with open("./helper/en.json", encoding="UTF8") as file:
    data = json.load(file)

items = {}

temp_items = {}

for key, value in data.items():
    id_part, attribute = key.split(" ", 1)
    
    # Check if it is an Id
    if len(id_part) == 24 and id_part.isalnum():
        if id_part not in temp_items:
            temp_items[id_part] = {}
        temp_items[id_part][attribute.lower()] = value
    else:
        break  # It is not an Id, all the items are in the front of the language file (hopefully)

for id_part, attributes in temp_items.items():
    if not (
        attributes.get("shortname") == "Item" or 
        attributes.get("description") == "Item"
    ):
        items[id_part] = attributes

# Create the json output
json_output = json.dumps(items, indent=4)
# print(json_output) # for Debug

with open("./src/data/item.json", "w") as json_file:
    json_file.write(json_output)
