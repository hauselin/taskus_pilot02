# %% load modules

from pathlib import Path
import numpy as np
import pandas as pd
import shutil

pd.set_option(
    "display.max_rows",
    8,
    "display.max_columns",
    None,
    "display.width",
    None,
    "display.expand_frame_repr",
    True,
    "display.max_colwidth",
    None,
)

np.set_printoptions(
    edgeitems=5,
    linewidth=233,
    precision=4,
    sign=" ",
    suppress=True,
    threshold=50,
    formatter=None,
)

#%%

false = list(Path("../headlines/false").glob("*"))
false = [f for f in false if f.name != ".DS_Store"]
true = list(Path("../headlines/true").glob("*"))
true = [t for t in true if t.name != ".DS_Store"]

#%%

len(false)
len(true)
all = false + true
len(all)

#%%

df = pd.DataFrame(
    {"veracity": ["false"] * len(false) + ["true"] * len(true), "path": all}
)


df = df.sample(n=df.shape[0], random_state=1).reset_index(drop=True)

#%%

for r in df.itertuples():
    print(r)
    j = r.Index + 101
    newname = r.path.parent.parent.parent.joinpath(
        f"headlines_renamed/id{j:03}{r.path.suffix}"
    )
    df.loc[r.Index, "oldname"] = r.path.name
    df.loc[r.Index, "id"] = newname.stem

    newname = newname.stem + "_" + r.veracity + r.path.suffix
    df.loc[r.Index, "newname"] = newname
    newname = r.path.parent.parent.parent.joinpath(f"headlines_renamed/{newname}")

    shutil.copy(str(r.path), str(newname))

#%%

github = (
    "https://raw.githubusercontent.com/hauselin/taskus_pilot02/main/headlines_renamed/"
)

p = Path("../headlines_sets")
p.mkdir(parents=True, exist_ok=True)

n_sets = 4
for n in range(n_sets):
    # select subset of headlines
    temp_df = df.sample(n=df.shape[0], random_state=n)
    temp_df["url"] = github + temp_df["newname"]

    li = temp_df["url"].to_list()

    txt = f"headlines_set{n+1:02}.txt"
    with open(p.joinpath(f"{txt}"), "w") as textfile:
        for i, element in enumerate(li):
            if i == 0:
                textfile.write('let imgURLs = ["' + element + '", ')
            elif i == len(li) - 1:
                textfile.write('"' + element + '"];')
            else:
                textfile.write('"' + element + '", ')
    temp_df.to_csv(p.joinpath(f"headlines_set{n+1:02}.csv"), index=False)
