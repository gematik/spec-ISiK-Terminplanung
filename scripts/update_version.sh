#!/bin/bash
clear
# This script will download the latest validation script from the template source save it
# to the scripts_folder and execute it to validate your fhir ressources.
script_name=release_publish.py
script_path=.

#parentdir="$(dirname "$script_path")"
#mkdir -p "$parentdir"

curl https://raw.githubusercontent.com/gematik/spec-TemplateForSimplifierProjects/feature/release_publish/scripts/$script_name -o $script_path
chmod a+x $script_path
python3 $script_name