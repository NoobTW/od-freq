const fs = require('fs');
const nodejieba = require('nodejieba');
const csv = require('csvtojson');

const list = [];

let kangaroo = 0;

String.prototype.remove = function(regex){
	return this.replace(regex, '');
}

nodejieba.load({
	dict: './dict/dict.txt',
	userDict: './dict/userdict.txt'
});

const keywords = {};

const processKeyword = name => {
	let lastGvName = '';
	csv()
	.fromFile(`../public/data/${name}.csv`)
	.on('csv', csvRow => {
		kangaroo++;
		let k = csvRow[1];
		k = nodejieba.tag(k);
		k = k
			.filter(z => {
				const x = z.tag;
				return x !== 'zg' && x !== 'y' && x !== 'w' && x !== 'tg' &&
				x !== 't' && x !== 's' && x !== 'ns' && x !== 'nrt' &&
				x !== 'nrfg' && x !== 'nr' && x !== 'ng' && x !== 'mq' &&
				x !== 'm' && x !== 'l' && x !== 'e' && /* x !== 'eng' && */
				x !== 'd' && x !== 'dg' && x !== 't';
			})
			.map(x => x.word)
			// .join('')
			// .remove(/（）/g)
			// .remove(/\(\)/g)
			// .remove(/\(-\)/g)
			// .remove(/\(~\)/g)
			// .remove(/^年度/)
			// .remove(/年度$/)
			// .remove(/\(滿\)/)
			// .remove(/-$/)
			// .remove(/^-/)
			// .remove(/、、/g)
			// .remove(/「/g)
			// .remove(/」/g)
			// .remove(/『/g)
			// .remove(/』/g)
			// .remove(/^、/g)
			// .remove(/-\S\S區別/);
			.filter( x => x.length > 1);
		Array.from(k).forEach(keyword => {
			let gvName = csvRow[3];
			if(gvName.trim() !== ''){
				lastGvName = gvName
			}else{
				console.log(csvRow[1] + ' ' + lastGvName)
				gvName = lastGvName;
			}
			if(keywords[keyword]){
				keywords[keyword][gvName] = Number.isInteger(keywords[keyword][gvName]) ? keywords[keyword][gvName] + 1 : 1;
			}else{
				keywords[keyword] = {};
				keywords[keyword][gvName] = 1;
			}
		});

		// if(k){
		// 	list.push(`${k.trim()}\t${csvRow[1]}`)
		// }else{
		// 	list.push(`${csvRow[1]}\t${csvRow[1]}`)
		// }
	})
	.on('end', () => {
		let arrKeywords = [];
		Object.keys(keywords).forEach(k => {
			const keyword = {
				name: k,
				gv: keywords[k],
				total: 0,
			};
			Object.keys(keyword.gv).forEach(gv => {
				keyword.total += keyword.gv[gv];
			});
			arrKeywords.push(keyword);
		});
		arrKeywords = arrKeywords.sort((a, b) => b.total - a.total)

		fs.writeFileSync(`../public/data/${name}-keyword.json`, JSON.stringify(arrKeywords), 'utf-8');
	});
}

processKeyword('2017-03');
processKeyword('2017-08');
processKeyword('2018-01');

