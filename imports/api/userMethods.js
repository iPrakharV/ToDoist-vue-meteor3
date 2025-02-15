import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({
  async updatePhoneNumber(phone) {
    check(phone, String)

    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    if (!/^\d+$/.test(phone)) {
      throw new Meteor.Error('invalid-phone', 'Phone number must contain only digits.')
    }

    // Use the async version
    await Meteor.users.updateAsync(this.userId, {
      $set: { 'profile.phone': phone }
    })
  }
})