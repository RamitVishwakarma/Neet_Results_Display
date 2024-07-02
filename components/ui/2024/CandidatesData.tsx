"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Candidates } from "../../../interfaces/Candidates";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CandidatesData = async () => {
  const [candidates, setCandidates] = useState<Candidates[]>();
  const [loading, setLoading] = useState(true);
  const [totalCandidates, setTotalCandidates] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/code100x/neet-results-2024/gh-pages/scrape.json"
      )
      .then((response) => {
        setCandidates(response.data.total);
        setTotalCandidates(response.data.len);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {candidates ? (
        <Table>
          <TableCaption>Total Candidates were {totalCandidates}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>All India Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Marks </TableHead>
              <TableHead>Application Number</TableHead>
              <TableHead>Date of Birth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates?.map((candidate) => (
              <TableRow>
                <TableCell>{candidate.allIndiaRank}</TableCell>
                <TableCell>{candidate.candidateName}</TableCell>
                <TableCell>
                  {candidate.marks === "AbsAbsent"
                    ? "Absent"
                    : candidate.marks.match(/\d{1,3}/)?.[0]}
                  {}
                </TableCell>
                <TableCell>{candidate.applicationNumber}</TableCell>
                <TableCell>{`${candidate.day}/${candidate.month}/${candidate.year}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </>
  );
};

export default CandidatesData;
