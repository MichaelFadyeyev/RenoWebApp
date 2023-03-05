<?php


 class Job{

    private $id;
    private $spec;
    private $start_date;
    private $finish_date;
    private $description;

    public function __construct($id, $spec, $start_date, $finish_date, $description)
    {
        $this->id = $id;
        $this->spec = $spec;
        $this->start_date = $start_date;
        $this->finish_date = $finish_date;
        $this->description = $description;
    }

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     */
    public function setId($id): self
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of spec
     */
    public function getSpec()
    {
        return $this->spec;
    }

    /**
     * Set the value of spec
     */
    public function setSpec($spec): self
    {
        $this->spec = $spec;

        return $this;
    }

    /**
     * Get the value of start_date
     */
    public function getStartDate()
    {
        return $this->start_date;
    }

    /**
     * Set the value of start_date
     */
    public function setStartDate($start_date): self
    {
        $this->start_date = $start_date;

        return $this;
    }

    /**
     * Get the value of finish_date
     */
    public function getFinishDate()
    {
        return $this->finish_date;
    }

    /**
     * Set the value of finish_date
     */
    public function setFinishDate($finish_date): self
    {
        $this->finish_date = $finish_date;

        return $this;
    }

    /**
     * Get the value of description
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set the value of description
     */
    public function setDescription($description): self
    {
        $this->description = $description;

        return $this;
    }
}