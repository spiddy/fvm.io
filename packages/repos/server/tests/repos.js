'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Repo = mongoose.model('Repo');

/**
 * Globals
 */
var user;
var repo;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Repo:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        repo = new Repo({
          name: 'reponame',
          description: 'Repo Description',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return repo.save(function(err) {
          should.not.exist(err);
          repo.name.should.equal('reponame');
          repo.description.should.equal('Repo Description');
          repo.user.should.not.have.length(0);
          repo.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without name', function(done) {
        repo.name = '';

        return repo.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without description', function(done) {
        repo.description = '';

        return repo.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        repo.user = {};

        return repo.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      repo.remove();
      user.remove();
      done();
    });
  });
});
