const fs = require('fs');
const glob = require('glob');

const skipFiles = [
    'src/app/proposal/page.tsx'
];

glob('src/**/*.{tsx,ts}', (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (skipFiles.includes(file)) return;
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes('Minta Proposal')) {
            content = content.replace(/Minta Proposal/g, 'Diskusikan Kebutuhan Training');
            fs.writeFileSync(file, content);
            console.log(`Updated ${file}`);
        }
    });
});
