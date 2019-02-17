'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Unknown Error
exports.UNKNOWN_ERROR = 'UNKNOWN_ERROR';
// Not implemented
exports.NOT_IMPLEMENTED = 'NOT_IMPLEMENTED';
// Missing new operator to an object
//  - name: The name of the class
exports.MISSING_NEW = 'MISSING_NEW';
// Call exception
//  - transaction: the transaction
//  - address?: the contract address
//  - args?: The arguments passed into the function
//  - method?: The Solidity method signature
//  - errorSignature?: The EIP848 error signature
//  - errorArgs?: The EIP848 error parameters
//  - reason: The reason (only for EIP848 "Error(string)")
exports.CALL_EXCEPTION = 'CALL_EXCEPTION';
// Invalid argument (e.g. value is incompatible with type) to a function:
//   - arg: The argument name that was invalid
//   - value: The value of the argument
exports.INVALID_ARGUMENT = 'INVALID_ARGUMENT';
// Missing argument to a function:
//   - count: The number of arguments received
//   - expectedCount: The number of arguments expected
exports.MISSING_ARGUMENT = 'MISSING_ARGUMENT';
// Too many arguments
//   - count: The number of arguments received
//   - expectedCount: The number of arguments expected
exports.UNEXPECTED_ARGUMENT = 'UNEXPECTED_ARGUMENT';
// Numeric Fault
//   - operation: the operation being executed
//   - fault: the reason this faulted
exports.NUMERIC_FAULT = 'NUMERIC_FAULT';
// Insufficien funds (< value + gasLimit * gasPrice)
//   - transaction: the transaction attempted
exports.INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS';
// Nonce has already been used
//   - transaction: the transaction attempted
exports.NONCE_EXPIRED = 'NONCE_EXPIRED';
// The replacement fee for the transaction is too low
//   - transaction: the transaction attempted
exports.REPLACEMENT_UNDERPRICED = 'REPLACEMENT_UNDERPRICED';
// Unsupported operation
//   - operation
exports.UNSUPPORTED_OPERATION = 'UNSUPPORTED_OPERATION';
let _permanentCensorErrors = false;
let _censorErrors = false;
// @TODO: Enum
function throwError(message, code = exports.UNKNOWN_ERROR, params = {}) {
    if (_censorErrors) {
        throw new Error('unknown error');
    }
    let messageDetails = [];
    Object.keys(params).forEach(key => {
        try {
            messageDetails.push(key + '=' + JSON.stringify(params[key]));
        }
        catch (error) {
            messageDetails.push(key + '=' + JSON.stringify(params[key].toString()));
        }
    });
    messageDetails.push('version=1');
    let reason = message;
    if (messageDetails.length) {
        message += ' (' + messageDetails.join(', ') + ')';
    }
    // @TODO: Any??
    let error = new Error(message);
    error.reason = reason;
    error.code = code;
    Object.keys(params).forEach(function (key) {
        error[key] = params[key];
    });
    throw error;
}
exports.throwError = throwError;
function checkNew(self, kind) {
    if (!(self instanceof kind)) {
        throwError('missing new', exports.MISSING_NEW, { name: kind.name });
    }
}
exports.checkNew = checkNew;
function checkArgumentCount(count, expectedCount, suffix) {
    if (!suffix) {
        suffix = '';
    }
    if (count < expectedCount) {
        throwError('missing argument' + suffix, exports.MISSING_ARGUMENT, { count: count, expectedCount: expectedCount });
    }
    if (count > expectedCount) {
        throwError('too many arguments' + suffix, exports.UNEXPECTED_ARGUMENT, { count: count, expectedCount: expectedCount });
    }
}
exports.checkArgumentCount = checkArgumentCount;
function setCensorship(censorship, permanent) {
    if (_permanentCensorErrors) {
        throwError('error censorship permanent', exports.UNSUPPORTED_OPERATION, { operation: 'setCersorship' });
    }
    _censorErrors = !!censorship;
    _permanentCensorErrors = !!permanent;
}
exports.setCensorship = setCensorship;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V0aGVycy9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUViLGdCQUFnQjtBQUNILFFBQUEsYUFBYSxHQUFHLGVBQWUsQ0FBQztBQUU3QyxrQkFBa0I7QUFDTCxRQUFBLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztBQUVqRCxvQ0FBb0M7QUFDcEMsaUNBQWlDO0FBQ3BCLFFBQUEsV0FBVyxHQUFHLGFBQWEsQ0FBQztBQUV6QyxpQkFBaUI7QUFDakIsa0NBQWtDO0FBQ2xDLG9DQUFvQztBQUNwQyxtREFBbUQ7QUFDbkQsNENBQTRDO0FBQzVDLGlEQUFpRDtBQUNqRCw2Q0FBNkM7QUFDN0MsMERBQTBEO0FBQzdDLFFBQUEsY0FBYyxHQUFHLGdCQUFnQixDQUFDO0FBRS9DLHlFQUF5RTtBQUN6RSw4Q0FBOEM7QUFDOUMsdUNBQXVDO0FBQzFCLFFBQUEsZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUM7QUFFbkQsa0NBQWtDO0FBQ2xDLDhDQUE4QztBQUM5QyxzREFBc0Q7QUFDekMsUUFBQSxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztBQUVuRCxxQkFBcUI7QUFDckIsOENBQThDO0FBQzlDLHNEQUFzRDtBQUN6QyxRQUFBLG1CQUFtQixHQUFHLHFCQUFxQixDQUFDO0FBRXpELGdCQUFnQjtBQUNoQiw4Q0FBOEM7QUFDOUMscUNBQXFDO0FBQ3hCLFFBQUEsYUFBYSxHQUFHLGVBQWUsQ0FBQztBQUU3QyxvREFBb0Q7QUFDcEQsNkNBQTZDO0FBQ2hDLFFBQUEsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUM7QUFFdkQsOEJBQThCO0FBQzlCLDZDQUE2QztBQUNoQyxRQUFBLGFBQWEsR0FBRyxlQUFlLENBQUM7QUFFN0MscURBQXFEO0FBQ3JELDZDQUE2QztBQUNoQyxRQUFBLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO0FBRWpFLHdCQUF3QjtBQUN4Qixn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