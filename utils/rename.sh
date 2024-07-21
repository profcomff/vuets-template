#!/bin/bash

OLD_NAME_SNAKE=my_app
OLD_NAME_KEBAB=my-app

read -p "Enter new package name in snake case (my_app): " new_name_snake
new_name_snake=${new_name_snake:-my_app}
new_name_kebab=${new_name_snake//_/-}

git grep -l "${OLD_NAME_SNAKE}" | xargs sed -i "s/${OLD_NAME_SNAKE}/${new_name_snake}/g"  # For linux
git grep -l "${OLD_NAME_KEBAB}" | xargs sed -i "s/${OLD_NAME_KEBAB}/${new_name_kebab}/g"  # For linux
git grep -l "${OLD_NAME_SNAKE}" | xargs sed -i "" -e "s/${OLD_NAME_SNAKE}/${new_name_snake}/g"  # For macos
git grep -l "${OLD_NAME_KEBAB}" | xargs sed -i "" -e "s/${OLD_NAME_KEBAB}/${new_name_kebab}/g"  # For macos

find . -depth -name "*${OLD_NAME_SNAKE}*" | \
    while IFS= read -r ent; do mv $ent ${ent%${OLD_NAME_SNAKE}*}${new_name_snake}${ent##*${OLD_NAME_SNAKE}}; done

find . -depth -name "*${OLD_NAME_KEBAB}*" | \
    while IFS= read -r ent; do mv $ent ${ent%${OLD_NAME_KEBAB}*}${new_name_kebab}${ent##*${OLD_NAME_KEBAB}}; done
