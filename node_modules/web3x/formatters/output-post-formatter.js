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
const utils_1 = require("../utils");
/**
 * Formats the output of a received post message
 *
 * @method outputPostFormatter
 * @param {Object}
 * @returns {Object}
 */
function outputPostFormatter(post) {
    post.expiry = utils_1.hexToNumber(post.expiry);
    post.sent = utils_1.hexToNumber(post.sent);
    post.ttl = utils_1.hexToNumber(post.ttl);
    post.workProved = utils_1.hexToNumber(post.workProved);
    // post.payloadRaw = post.payload;
    // post.payload = utils.hexToAscii(post.payload);
    // if (utils.isJson(post.payload)) {
    //     post.payload = JSON.parse(post.payload);
    // }
    // format the following options
    if (!post.topics) {
        post.topics = [];
    }
    post.topics = post.topics.map(topic => {
        return utils_1.hexToUtf8(topic);
    });
    return post;
}
exports.outputPostFormatter = outputPostFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBvc3QtZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Zvcm1hdHRlcnMvb3V0cHV0LXBvc3QtZm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7O0FBRUYsb0NBQWtEO0FBRWxEOzs7Ozs7R0FNRztBQUNILFNBQWdCLG1CQUFtQixDQUFDLElBQUk7SUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLElBQUksQ0FBQyxHQUFHLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxrQ0FBa0M7SUFDbEMsaURBQWlEO0lBRWpELG9DQUFvQztJQUNwQywrQ0FBK0M7SUFDL0MsSUFBSTtJQUVKLCtCQUErQjtJQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUNsQjtJQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDcEMsT0FBTyxpQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBckJELGtEQXFCQyJ9