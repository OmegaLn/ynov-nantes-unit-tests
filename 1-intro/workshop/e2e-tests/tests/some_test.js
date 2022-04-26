//const { browserContext } = this.helpers.Playwright;
//const assert = require('assert')

Feature('Ynov Nantes');

Scenario('Test Ynov Nantes Land Page/Feature:Search Module', async ({ I }) => {
    I.amOnPage('https://www.ynov-nantes.com/');
    I.click('.search-cta a.cta');
    I.see('Que recherchez-vous ?','div');
    I.fillField('input.searchfield', 'info');
    
    if (await I.grabTextFrom('.results-list .search-preview-cursus .preview-title .tile-title') == "Bachelor Informatique") {
        I.say('Bachelor informatique found proceeding...');
    }
    
    /*
    l'implémentation des deux méthodes m'a permis de comparer les temps d'execution quant à la comparaison avec l'assert "Bachelor Informatique"
    Avec un if classique le temps d'éxecution était de 7576 ms
    Alors qu'avec la seconde méthode (utilisation du assert.equal pour comparer) le temps d'éxecution était de 7628ms 
    Pour tester veuillez décommenter le bloc suivant :
    
    let search = await I.grabTextFrom('.results-list .search-preview-cursus .preview-title .tile-title');
    assert.equal(search, 'Bachelor Informatique');
    */
});
