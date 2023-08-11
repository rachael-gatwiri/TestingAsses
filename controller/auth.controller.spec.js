const mssql = require('mssql');
const {MemberRegister} = require('../controller/auth.controller');
const { describe } = require('node:test');

describe('MemberRegister', () => {
    it('should register successfully', async () => {
        const req = {
            body: {
                username: 'test',
                password: 'test',
                email: 'elon@gmai.com'
            }}
    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }
    jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
        request: jest.fn().mockResolvedValueOnce(),
        input: jest.fn().mockReturnThis(),  
        execute: jest.fn().mockResolvedValueOnce(
            {
                recordset: []
            }
        )
    });
})
})
