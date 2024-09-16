# Note save

flowchart LR
G[(enter the website, studies.cs.helsinki.fi/exampleapp/notes )] ==> |connect| P[[notes]]

%%Projects notes%%

%%tasks%%
P --o |input| PT([write a note in the input])
PT ---x IC(save) 
IC --> SC(appears on screen)


# stepSave

Enter ->>  PT: [web site](https://studies.cs.helsinki.fi/exampleapp/spa)

PT ->> |input| IC: write a note in the input

IC ->> SC: appears on screen




