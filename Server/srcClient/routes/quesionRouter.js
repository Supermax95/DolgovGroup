const router = require('express').Router();
const { Op } = require('sequelize');
const { Question } = require('../../db/models');

router.get('/admin/questions', async (req, res) => {
  try {
    const questions = await Question.findAll({
      order: [['title', 'ASC']],
      raw: true,
    });

    res.json(questions);
  } catch (error) {
    console.error('Ошибка при получении данных из базы данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при получении данных из базы',
    });
  }
});


router.post('/admin/questions', async (req, res) => {
  const { newQuestion } = req.body;

  try {
    const existingQuestion = await Question.findOne({
      where: { title: newQuestion.title },
    });
    if (existingQuestion) {
      return res.status(400).json({
        error: 'Вопрос с таким названием уже существует',
      });
    }

    await Question.create({
      title: newQuestion.title,
      description: newQuestion.description,
    });

    const questions = await Question.findAll({
      order: [['title', 'ASC']],
      raw: true,
    });

    res.json(questions);
  } catch (error) {
    console.error('Ошибка при добавлении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при добавлении данных в базу',
    });
  }
});

router.delete('/admin/questions/:id', async (req, res) => {
  const questionId = req.params.id;
  try {
    await Question.destroy({
      where: { id: questionId },
    });
    const questions = await Question.findAll({
      order: [['title', 'ASC']],
      raw: true,
    });

    res.json(questions);
  } catch (error) {
    console.error('Ошибка при удалении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при удалении данных из базы',
    });
  }
});

router.put('/admin/questions', async (req, res) => {
  const { newInfo } = req.body;

  try {
    const existingQuestion = await Question.findOne({
      where: { title: newInfo.title, id: { [Op.not]: newInfo.id } },
    });

    if (existingQuestion) {
      return res.status(400).json({
        error: 'Вопрос с таким названием уже существует',
      });
    }
    await Question.update(
      {
        title: newInfo.title,
        description: newInfo.description,
      },
      {
        where: { id: newInfo.id },
      }
    );

    const questions = await Question.findAll({
      order: [['title', 'ASC']],
      raw: true,
    });

    res.json(questions);
  } catch (error) {
    console.error('Ошибка при обновлении данных', error);
    res.status(500).json({
      error: 'Произошла ошибка на сервере при обновлении данных в базе',
    });
  }
});

module.exports = router;
