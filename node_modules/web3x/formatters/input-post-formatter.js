"use strict";
/*
  This file is part of web3x.

  web3x is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  web3x is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with web3x.  If not, see <http://www.gnu.org/licenses/>.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const utils_1 = require("../utils");
/**
 * Formats the input of a whisper post and converts all values to HEX
 *
 * @method inputPostFormatter
 * @param {Object} transaction object
 * @returns {Object}
 */
function inputPostFormatter(post) {
    // post.payload = utils.toHex(post.payload);
    if (post.ttl) {
        post.ttl = utils_1.numberToHex(post.ttl);
    }
    if (post.workToProve) {
        post.workToProve = utils_1.numberToHex(post.workToProve);
    }
    if (post.priority) {
        post.priority = utils_1.numberToHex(post.priority);
    }
    // fallback
    if (!util_1.isArray(post.topics)) {
        post.topics = post.topics ? [post.topics] : [];
    }
    // format the following options
    post.topics = post.topics.map(topic => {
        // convert only if not hex
        return topic.indexOf('0x') === 0 ? topic : utils_1.utf8ToHex(topic);
    });
    return post;
}
exports.inputPostFormatter = inputPostFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtcG9zdC1mb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZm9ybWF0dGVycy9pbnB1dC1wb3N0LWZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFOztBQUVGLCtCQUErQjtBQUMvQixvQ0FBa0Q7QUFFbEQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsSUFBSTtJQUNyQyw0Q0FBNEM7SUFFNUMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1osSUFBSSxDQUFDLEdBQUcsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQztJQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2xEO0lBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDNUM7SUFFRCxXQUFXO0lBQ1gsSUFBSSxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ2hEO0lBRUQsK0JBQStCO0lBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDcEMsMEJBQTBCO1FBQzFCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsaUJBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQXpCRCxnREF5QkMifQ==