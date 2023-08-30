import {describe, expect, test} from '@jest/globals';
var {generateMessage} = require('../utils/message')

describe('generateMessage',()=>{
    test('should generate correcte  Message Object',()=>{

        var from ="Andrew"
        var text = "Hello World"
        var message = generateMessage(from,text)
        expect(message.createdAt).tobe('number')
        expect(message).toInclude({from,text});
    })

    }
)