# QuickWiki

Quick script to read a Wiki extract in the shell. This allows you to query Wikipedia from right within the shell!
Displays a summary of the query along with a selectable menu of sections. 

Highlights keywords in `/src/key-words.ts` in red for quick skims

## Usage
`npm install quickwikip`

`npm start {QUERY}` e.g. `npm start democracy`

![alt text](/quickwiki.png "Screenshot")

## Keys:
* Exit: `e` or `Esc`
* New query: `q` followed by query followed by `Enter`

## Built With

* [Typescript](http://www.dropwizard.io/1.0.2/docs/) - The language used
* [Chalk](https://maven.apache.org/) - For fancy console output
* [MediaWiki API](https://rometools.github.io/rome/) - To query Wikipedia
* [HTMLParser2](https://rometools.github.io/rome/) -  To parse HTML from MediaWiki API

## License

This project is licensed under the MIT License
