<?php


 class Project{

    private $id;
    private $jobs = [];
    private $workers = []; // of base type Worker
    private $start_date;
    private $finish_date;
    private $description;

    public function __construct($id, $jobs, $workers, $start_date, $finish_date, $description)
    {
        $this->id = $id;
        $this->jobs = $jobs;
        $this->workers = $workers;
        $this->start_date = $start_date;
        $this->finish_date = $finish_date;
        $this->description = $description;
    }


    public function getId()
    {
        return $this->id;
    }


    public function setId($id): self
    {
        $this->id = $id;

        return $this;
    }


    public function getJobs()
    {
        return $this->jobs;
    }


    public function setJobs($jobs): self
    {
        $this->jobs = $jobs;

        return $this;
    }


    public function getWorkers()
    {
        return $this->workers;
    }


    public function setWorkers($workers): self
    {
        $this->workers = $workers;

        return $this;
    }


    public function getStartDate()
    {
        return $this->start_date;
    }


    public function setStartDate($start_date): self
    {
        $this->start_date = $start_date;

        return $this;
    }


    public function getFinishDate()
    {
        return $this->finish_date;
    }

  
    public function setFinishDate($finish_date): self
    {
        $this->finish_date = $finish_date;

        return $this;
    }


    public function getDescription()
    {
        return $this->description;
    }


    public function setDescription($description): self
    {
        $this->description = $description;

        return $this;
    }
}