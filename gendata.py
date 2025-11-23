import os
import json

from pathlib import Path

CFG_PATH = Path("/bkp/oldwin/ps2_artwork/cfg/CFG_en")
OUTPUT = Path("./result.json")


"""
CfgVersion=8
Title=F1 Racing Championship
Vmode=vmode/ntsc
VmodeText=NTSC
Rating=rating/4
RatingText=4
Description=F1 Racing Championship is the third Ubi Soft F1 racing simulation game, published with the FIA license by Video System. It features official tracks, drivers and cars of the 1999 F1 season.
Release=03-22-2001
Developer=Ubisoft
Genre=Simulation
Players=players/2
PlayersText=2
"""

template = {
    "Serial": None,
    "Title": None,
    "Description": None,
    "Release": None,
    "Developer": None,
    "Genre": None,
    "Rating": None,
    "RatingText": None,
        
    "Players": None,
    "PlayersText": None,
    
    "CfgVersion": None,
    "VMode": None,
    "VModeText": None,
}


def main():
    result = []
    files = CFG_PATH.glob("*.cfg")

    for path in list(files):
        game = {}
        with path.open("r") as file:
            data =file.read()

            for item in data.splitlines():    
                try: key, value = item.strip().split("=", 1)
                except: 
                    print(item)
                    continue
                game[key] = value
            
            game["Serial"] = path.name.split(".cfg")[0]
        
        result.append(game)
    
    with OUTPUT.open("w") as output_file:
        json.dump(result, output_file)


if (__name__ == "__main__"):
    main()