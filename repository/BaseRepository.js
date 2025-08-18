class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  async findById(id, options = {}) {
    return await this.model.findByPk(id, options);
  }

  async create(data) {
    const instance = await this.model.create(data);
    return instance.get({ plain: true });
  }

  async update(id, data) {
    const instance = await this.findById(id);
    if (!instance) throw new Error("Record not found");

    await instance.update(data);
    return instance.get({ plain: true });
  }

  async delete(id) {
    const instance = await this.model.findByPk(id);
    if (!instance) {
      throw new Error("Record not found");
    }
    await instance.destroy();
    return true;
  }

  async count(options = {}) {
    return await this.model.count(options);
  }
}

export default BaseRepository;
