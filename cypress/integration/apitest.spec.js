describe('Test Advices API', () => {
    var result

    //Test 1
    it('validate content-type', () => {
        result= cy.request('https://api.adviceslip.com/advice')
        cy.document().its('contentType')
              .should('equal','text/html');
    })
    
    //Test 2
    it('validate the status code', () => {
        result= cy.request('https://api.adviceslip.com/advice')
        result.its('status')
              .should('equal',200);
    })
    
    //Test 3
    it('validate response should have and advice and slip', () => {
        result= cy.request('https://api.adviceslip.com/advice')
        result.its('body')
              .should('include','advice')
              .should('include','slip_id');
    })

    //Test4
    it('verify callback parameter', () => {
        result= cy.request('https://api.adviceslip.com/advice?callback=test')
        result.its('body')
              .should('include','test')
              .should('include','advice')
              .should('include','slip_id');
    })

    //Test 5
    it('validate valid text for advice ID=1', () => {
        result= cy.request('https://api.adviceslip.com/advice/1')
        result.its('body')
              .should('include','advice')
              .should('include','Remember that spiders are more afraid of you, than you are of them.');
    })

    //Test 6
    it ('validate the error message', () => {
        result = cy.request('https://api.adviceslip.com/advice/dmkdmdkd')
        result.its('body')
              .should('include','error');
    })

    //Test7
    it('verify callback parameter', () => {
        result= cy.request('https://api.adviceslip.com/advice/1?callback=test')
        result.its('body')
              .should('include','test')
              .should('include','advice')
    })


    //Test 8
    it('validates returns valid search object', () => {
        result= cy.request('https://api.adviceslip.com/advice/search/spiders')
        result.its('body')
              .should('include','total_results')
              .should('include','query')
              .should('include','slips')
              .should('include','advice')
              .should('include','slip_id');
    })


    //Test 9
    it('validates total_results=1 for query=spiders', () => {
        result= cy.request('https://api.adviceslip.com/advice/search/spiders')
        result.its('body')
              .should('include','"total_results": "1"')
    })

    //Test 10
    it('validates total_results=6 for query=advice', () => {
        result= cy.request('https://api.adviceslip.com/advice/search/advice')
        result.its('body')
              .should('include','"total_results": "6"')
    })
    
    
    //Test 11
    it ('validate the noticed message', () => {
        result = cy.request('https://api.adviceslip.com/advice/search/dmkdmdkd')
        result.its('body')
              .should('include','notice');
    })


    //Test 12
    it ('validate the noticed text', () => {
        result = cy.request('https://api.adviceslip.com/advice/search/dmkdmdkd')
        result.its('body')
              .should('include','"text": "No advice slips found matching that search term."');
    })
})